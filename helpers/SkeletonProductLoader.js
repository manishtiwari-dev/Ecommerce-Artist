// components/SkeletonLoader.js
import React from 'react';
import styles from './SkeletonProductLoader.module.css'; // Adjust based on your setup

const SkeletonProductLoader = ({ items = 3 }) => {
  return (
    <section className="Latest-collections desktop-lastest-collections">
      <div className="container-fluid">
        <div className="row">

          {/* Skeleton loading columns */}
          {[...Array(items)].map((_, index) => (
            <div className="column col-md-4" key={index}>
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

export default SkeletonProductLoader;
