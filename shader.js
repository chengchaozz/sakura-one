var vert = `
		precision highp float;

    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;

    // attributes, out
    varying vec3 var_vertPos;
    varying vec3 var_vertNormal;
    varying vec2 var_vertTexCoord;
		varying vec4 var_centerGlPosition;//原点
    
    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;
		uniform float u_time;


    void main() {
      vec3 pos = aPosition;
			vec4 posOut = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
      gl_Position = posOut;

      // set out value
      var_vertPos      = pos;
      var_vertNormal   =  aNormal;
      var_vertTexCoord = aTexCoord;
			var_centerGlPosition = uProjectionMatrix * uModelViewMatrix * vec4(0., 0., 0.,1.0);
    }
`;


var frag = `

precision highp float;

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 pu_mouse;
uniform vec2 u_canvas;
uniform float u_time;
uniform sampler2D u_tex;


float random (in vec2 st) {
   	highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(st.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float noise(vec2 st) {
    vec2 i = vec2(0.);
		i = floor(st);
    vec2 f = vec2(0.);
		f = fract(st);
    vec2 u =  vec2(0.);
		u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}


float grid(vec2 uv){
    vec2 guv = fract(uv * 10.0);
    float line = guv.x > 0.4 && guv.x < 0.6  || guv.y > 0.45 && guv.y < 0.55 ? 1.0 : 0.0;
    return line;
}

float remap(float i, float cMin, float cMax, float nMin, float nMax, bool clamp){
    float ni = nMin + (cMax - i) * (nMax - nMin) / (cMax - cMin);
    ni = clamp == true ? max(min(nMax, ni), nMin) : ni;
    return ni;
}

vec2 bend(vec2 uv){
  float mouseDis=length(u_mouse-pu_mouse)/100.;
   // float ny = remap(uv.y, 1.0, 0.0, -0.1 + 0.2*sin(u_time)/100., 0.0025*u_mouse.y, false);
    float ny=0.;
    if(u_mouse.y-u_canvas.y/2.<0.){
      ny = remap(uv.y, 0.0, 1.0, -0.1 + 0.2*sin(u_time)/100., 0.0025*u_mouse.y, false);
    }else{
      ny = remap(uv.y, 1.0, 0.0, -0.1 + 0.2*sin(u_time)/100., 0.0025*(u_canvas.y-u_mouse.y), false);
    }
    ny = clamp(ny, 1.0, 0.0);
    float bendRatio = pow(ny, 10.5) ;
    float nx = pow((gl_FragCoord.x*2.0 - u_resolution.x)/u_resolution.x, 2.0);
    bendRatio *=  (1.0-nx);
    float bendX = u_mouse.x/1000.*sin(uv.y*PI*u_mouse.x/10. + u_time)* (bendRatio *(1.0+ random(uv + u_time)*0.07*bendRatio));
    float bendY = random(uv + u_time)*0.01*bendRatio;
    //float bendY=0.2*sin(uv.x*PI*10.0 + u_time)* (bendRatio *(1.0+ random(uv + u_time)*0.07*bendRatio));
    
    vec2 bendUv =vec2(uv.x + bendX, uv.y );
    return bendUv;
}


void main() {
   vec2 pos = gl_FragCoord.xy/u_resolution.xy;
		pos.y = 1.0 - pos.y;
    //noise
    float n = random(pos);
    n *= max(pos.y -0.3, 0.0);
		n = 1.0 - n;
		n = smoothstep(0.4, 1.0, n);
    
    pos = bend(pos);
		vec3 col = vec3(texture2D(u_tex, pos).x , texture2D(u_tex, pos+vec2(pos.y / u_resolution.y * 15.0 ,0.0)).yz);
		//col *= n;

    gl_FragColor = vec4(vec3(col), 1.0);
}

`;