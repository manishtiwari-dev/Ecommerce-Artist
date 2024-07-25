// SkeletonLatestCollections.jsx

import React from 'react';
import styles from './SkeletonLatestCollections.module.css'; // Import CSS styles

const SkeletonLatestCollections = () => {
  return (
    <section className="Latest-collections desktop-lastest-collections">
      <div className="container-fluid">
        <div className="row">
          <h3>Featured Art Piece</h3>
          {/* Skeleton loading columns */}
          {[...Array(8)].map((_, index) => (
            <div className="column" key={index}>
              <div className={styles.skeletonItem}>
                {/* Skeleton loading image */}
                <div className={styles.image}></div>
                {/* Skeleton loading content */}
                <div className={styles.content}>
                  <div className={styles.title}></div>
                  <div className={styles.subtitle}></div>
                  <div className={styles.size}></div>
                  <div className={styles.price}></div>
                </div>
                {/* Skeleton loading buttons */}
                <div className={styles.buttons}>
                  <div className={styles.button}></div>
                  <div className={styles.button}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkeletonLatestCollections;
