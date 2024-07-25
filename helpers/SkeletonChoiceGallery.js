// SkeletonChoiceGallery.jsx

import React from 'react';
import styles from './SkeletonChoiceGallery.module.css'; // Import CSS styles

const SkeletonChoiceGallery = () => {
  return (
    <section className="Artist choice-gallery">
      <div className="container-fluid">
        <div className="row">
          <h3>Choice Gallery</h3>
          {/* Skeleton loading tabs */}
          <ul className="nav nav-tabs">
            {[...Array(3)].map((_, index) => (
              <li className="nav-item" key={index}>
                <a className={`nav-link ${styles.tab}`} href="#">
                  {/* Skeleton loading tab title */}
                </a>
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {[...Array(3)].map((_, index) => (
              <div className={`tab-pane container ${styles.tabPane}`} key={index}>
                <div className="inner-taber">
                  {/* Skeleton loading gallery items */}
                  {[...Array(6)].map((_, subIndex) => (
                    <div className="item" key={subIndex}>
                      <div className={styles.image}></div>
                      <div className={styles.content}>
                        {/* Skeleton loading title */}
                        <div className={styles.title}></div>
                        {/* Skeleton loading button */}
                        <div className={styles.button}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonChoiceGallery;
