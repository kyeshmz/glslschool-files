attribute vec3 position;  // 頂点座標
attribute vec4 color;     // 頂点カラー
uniform   mat4 mvpMatrix; // 座標変換行列
uniform   float moveParam; // 移動係数（0.0 ~ 1.0） @@@
varying   vec4 vColor;    // フラグメントシェーダへ送る色

const float PI = 3.1415926;

void main(){
    // 色はそのままフラグメントシェーダへ
    vColor = color;
    // 移動係数を補正 @@@
    float s = sin(moveParam * PI);
    // 頂点の座標は行列を使って変換する @@@
    gl_Position = mvpMatrix * vec4(position + vec3(0.0, 0.0, s), 1.0);
    // 点のプリミティブとして描くのでサイズを指定
    gl_PointSize = 8.0;
}
