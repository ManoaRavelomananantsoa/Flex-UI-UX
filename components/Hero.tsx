export function Hero() {
  return (
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Texte à gauche */}
      <div className="flex-1 space-y-6">
        <span className="text-cyan-400 font-medium">CREATIVE DESIGNER</span>
        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
          WE ARE <br /> 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
            CREATIVE
          </span> <br />
          DESIGNERS
        </h1>
        <p className="text-zinc-400 max-w-lg text-lg">
          On mélange le code et le design pour créer des expériences numériques uniques. 
          Bienvenue dans mon repo "Flex UI/UX".
        </p>
      </div>

      {/* Image à droite avec l'effet de lueur néon */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative w-80 h-112.5 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
          <img 
            src="/images/toji.jpg" 
            alt="Portrait" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );
}