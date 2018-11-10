precision mediump float;
uniform sampler2D texture;    // フレームバッファに描画したレンダリング結果
uniform float     time;       // 時間の経過
uniform vec2      resolution; // スクリーン解像度

const float size = 20.0;      // モザイク模様ひとつあたりのサイズ @@@

void main(){
    // スクリーン座標をサイズで割ってからサイズを掛ける @@@
    //gl_Frag Coord = > kスクリーンの物理的なピクセル座標
    // 原点は左下
    // 512 x 512
    //floor kills anything under 小数点
    
    vec2 texCoord = floor(gl_FragCoord.xy / size) * size;

    // フレームバッファの描画結果をテクスチャから読み出す @@@
    //resoulution is screen resolution in vec2
    //texture2D is from 0 to 1, so we divide by the screen resolution to get 0 to 1
    vec4 samplerColor = texture2D(texture, texCoord / resolution);
    //vec4 samplerColor = texture2D(texture, gl_FragCoord.st / resolution);

    // テクスチャの色にノイズの値を掛ける
    gl_FragColor = samplerColor;
}
