import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { ProductGalleryItem } from '../../types/global';
import css from './Gallery.module.css';
import { useState } from 'react';

interface GalleryProps {
  gallery: ProductGalleryItem[];
  productName: string;
}

function Gallery({ gallery, productName }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className={css.container}>
      <ul className={css.imageList}>
        {gallery.map((imageObj, i) => (
          <li
            className={css.imageItem}
            key={i}
          >
            <button
              onClick={() => setIndex(i)}
              className={css.button}
            >
              <img
                className={css.image}
                src={imageObj.thumb}
                alt={productName}
                height={317}
                width={292}
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={index !== null}
        index={index || 0}
        close={() => setIndex(null)}
        slides={gallery.map(item => ({ src: item.original }))}
        styles={{
          container: {
            ['--yarl__container_background_color']: 'var(--color-main)',
          },
        }}
      />
    </div>
  );
}

export default Gallery;
