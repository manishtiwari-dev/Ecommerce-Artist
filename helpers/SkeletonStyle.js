// SkeletonStyle.jsx

import React from 'react';
import styles from './SkeletonStyle.module.css'; // Import CSS styles

const SkeletonStyle = () => {
  return (
    <section className="Style">
      <div className="container-fluid">
        <div className="row">
          <h3>Look For Style</h3>
          {/* Skeleton loading circle-boxes */}
          {[...Array(8)].map((_, index) => (
            <div className="col-3 circle-boxes" key={index}>
              <div className={`box ${styles.box}`}>
                <div className={`image ${styles.image}`}></div>
                <div className="content">
                  {/* Skeleton loading title */}
                  <div className={styles.title}></div>
                  {/* Skeleton loading button */}
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

export default SkeletonStyle;
