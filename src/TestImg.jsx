// temporary test component
import React from "react";
import testImg from "./assets/masala-doosa.png"; // adjust filename exactly

export default function App() {
  return (
    <div style={{ padding: 30 }}>
      <h2>Image test</h2>
      <img id="test-img" src={testImg} alt="test" style={{ width: 420, borderRadius: 8 }} />
      <p>src: <code id="srcval">{testImg}</code></p>
    </div>
  );
}
