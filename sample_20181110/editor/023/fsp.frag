precision mediump float;
uniform sampler2D texture;    // フレームバッファに描画したレンダリング結果
uniform float     time;       // 時間の経過
uniform vec2      resolution; // スクリーン解像度

const float size = 20.0;           // モザイク模様ひとつあたりのサイズ
const float halfSize = size * 0.5; // モザイク模様のサイズの半分

void main(){
    // スクリーン座標を均等に分割し範囲を size の領域に限定する（-size / 2 ～ size / 2） @@@
    //gl_FragCoord.xy is the physical coordinates of the pixels
    //dividing gl_fragCoord.xy by the size and getting the remainder with mod()
    // if size == 20.0
    // 0 ~ 19.9999 - halfSize = -10.0 ~ 0.000
    vec2 p = mod(gl_FragCoord.xy, size) - halfSize;

    // ベクトルの長さを測り二値化する @@@
    // [step]if first < second = 1 , else 0 
    float len = length(p);
    float lenStep = step(len, halfSize - 1.0);
    // アンチエイリアスする場合の例
    //using smoothstep
    //1st parameter min
    //2nd max
    //3rd covering parameter
    float edge = 1.0 - smoothstep(halfSize - 2.5, halfSize, length(p));
    lenStep *= edge;

    // スクリーン座標をサイズで割ってからサイズを掛ける
    vec2 texCoord = floor(gl_FragCoord.st / size) * size;

    // フレームバッファの描画結果をテクスチャから読み出す
    vec4 samplerColor = texture2D(texture, texCoord / resolution);

    // テクスチャの色にノイズの値を掛ける
    gl_FragColor = samplerColor * vec4(vec3(lenStep), 1.0);
    //regular mosaic
   // gl_FragColor = samplerColor;
}
