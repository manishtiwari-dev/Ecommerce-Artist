// SkeletonLoading.jsx

import React from 'react';
import styles from './SkeletonLoading.module.css'; // Import CSS styles
const SkeletonCollectionCard = () => {
  return (
   <>
  


    <section className="collections">
      <div className="container-fluid">
        <div className="row">
          <h3>Discover by Collections</h3>
          <div className="collections-items">
            {/* Skeleton loading items */}
            {[...Array(5)].map((_, index) => (
              <div className="items" key={index}>
                <div className={styles.image}></div>
                <div className={styles.content}>
                  <div className={styles['loading-text']}></div>
                  <div className={styles['loading-text']}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default SkeletonCollectionCard;


