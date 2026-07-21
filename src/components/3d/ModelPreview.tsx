

export const ModelPreview = () => {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-gray-500">
      {/* 
        TODO: Future 3D Integration 
        1. npm install @react-three/fiber @react-three/drei three
        2. Import Canvas from @react-three/fiber
        3. Replace this placeholder with:
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Your3DModel />
          <OrbitControls />
        </Canvas>
      */}
      <div className="text-4xl mb-4">🧊</div>
      <p className="font-mono text-sm tracking-widest uppercase">3D Render Placeholder</p>
      <p className="text-xs text-gray-600 mt-2 text-center max-w-xs">
        Ready for @react-three/fiber integration.<br/>
        Minecraft assets will be loaded from /media/renders/
      </p>
    </div>
  );
};
