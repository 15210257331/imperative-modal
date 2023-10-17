const svgNS = "http://www.w3.org/2000/svg";
const $ = document.querySelector.bind(document);
const path = $("path");
const svg = $("svg");

const { Vec, Mat, Mat4, Geometry } = Ella;
const { sin, cos } = Math;
let perspectiveMat;
const viewMat = Ella.lookAt(new Vec(1,1,1), new Vec(0,0,0), new Vec(0,1,0));
const obj = Geometry.sphere(.8, 20, 15);

const render = (time = 0) => {
  const halfW = svg.clientWidth / 2;
  const halfH = svg.clientHeight / 2;
  const points = obj.vertices.map((vert) => {
    const v = new Vec(vert.x, vert.y, vert.z, 1.0);
    const transMat = Mat4.translation(
      sin(2.0 * time * 5e-4) * .3,
      sin(3.0 * time * 5e-4) * .2,
      0
    );
    const rotX = Mat4.rotX(time * 5e-4);
    const rotY = Mat4.rotY(time * 5e-4);
    const modelMat = Mat4.identity().mul(transMat).mul(rotX).mul(rotY);
    const m = perspectiveMat.mul(viewMat).mul(modelMat); 
    const p = m.mul(v);
    return new Vec(halfW + p.x * halfW * 0.5, halfH + p.y * halfH * 0.5);
  });

  const pathDef = obj.faces
    .map((f) => [points[f[0]], points[f[1]], points[f[2]]])
    .map((points) => {
      return "M" + points.map((p) => `${p.x} ${p.y}`).join("L") + "Z";
    })
    .join("");
  path.setAttribute("d", pathDef);
  setTimeout(() => requestAnimationFrame(render), 12);
};

const setSize = () => {
  svg.setAttributeNS(
    svgNS,
    "viewBox",
    [0, 0, svg.clientWidth, svg.clientHeight].join(" ")
  );
  perspectiveMat = Ella.perspective(
    60,
    svg.clientWidth / svg.clientHeight,
    .1,
    300
  );
};

setSize();
render();
window.addEventListener("resize", setSize);