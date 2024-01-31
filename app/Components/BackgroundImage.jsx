import Image from 'next/image';
import bgImage from '../images/bg.jpg';

export default function BackgroundImage() {
  return (
    <div className="bg-image">
      <Image
        src={bgImage}
        alt="Background image de Lubos_Houska_Pixabay"
        layout="fill"
        objectFit="cover"
        quality={100}
        class="object-fit-cover border rounded bg-image z-n1" 
      />
    </div>
  );
}
//Image_Lubos_Houska_Pixabay