
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { fadeUp } from "../../utils/animations";

const images = [
  {
    url: "https://images.unsplash.com/photo-1607513746994-51f730a44832?q=80&w=1000&auto=format&fit=crop",
    title: "Mega Builds",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=1000&auto=format&fit=crop",
    title: "Community Events",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=1000&auto=format&fit=crop",
    title: "Kingdom Bases",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
    title: "Exploration",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  }
];

export const GalleryPreview = () => {
  return (
    <section className="py-24 relative z-10 bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          eyebrow="Community Showcase"
          title="MOMENTS FROM"
          gradientTitle="THE WORLD."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-2xl overflow-hidden ${image.colSpan} ${image.rowSpan}`}
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image.url})` }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-heading font-bold text-white mb-2">{image.title}</h3>
                <div className="w-8 h-1 bg-primary-light rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
