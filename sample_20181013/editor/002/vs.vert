// JavaScript から VBO 経由で送られてきた頂点座標
attribute vec3 position;
// JavaScript から送られてくる値を受け取る uniform 変数 @@@
uniform vec2 mouse; // -1.0 ~ 1.0 に変換されたカーソル変数

void main(){
    // マウスカーソルの値を反映してみる（その１） @@@
    //vec2 から vec3 に変換
    vec3 v = vec3(mouse, 0.0);
    //頂点の座標を足している
    gl_Position = vec4(position + v, 1.0);

    // マウスカーソルの値を反映してみる（その２） @@@
    //abs は絶対値, - + 関係ないよ
    //  float f = abs(mouse.x); // 0.0 ~ 1.0
    //  gl_Position = vec4(position * f, 1.0);

    // マウスカーソルの値を反映してみる（その３） @@@
    float f = length(mouse);
    gl_Position = vec4(position * f, 1.0);

    // 頂点の大きさは頂点シェーダで設定する
    gl_PointSize = 8.0;
}
