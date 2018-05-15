import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating.jsx';
import styles from './MiniListingStyle.css';


// comment below out for client side rendering
// const MiniListingCSS = styles._getCss();

const MiniListing = ({data}) => {

  return (
    <div>
      {/* comment below out for client side rendering */}
      {/* <style>{MiniListingCSS}</style> */}
      <div className={styles.miniListing}>
        <div>
          <img  className={styles.image} src={data.imageUrl} />
        </div>
          <div className={styles.listText}>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.descridivtion}>{data.description}</div>
            <div className={styles.rating}>
              <Rating rating={data.avg_rating}/>
              <span className={styles.numReviews}>{data.num_reviews} reviews</span>
            </div>
          </div>
        </div>
    </div>
  )

}

export default MiniListing;