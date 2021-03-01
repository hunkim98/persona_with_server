import { mask_raw } from "../masks/mask_raw";

export const best_with_gender = (personality, number) => {
  if (number === 0) {
    //man
    if (personality === 1) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
        </div>
      );
    } else if (personality === 2) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
        </div>
      );
    } else if (personality === 3) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[0]} />
          <img className="partner_mask_image" src={mask_raw[1]} />
        </div>
      );
    } else if (personality === 4) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <img className="partner_mask_image" src={mask_raw[5]} />
        </div>
      );
    } else if (personality === 5) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <img className="partner_mask_image" src={mask_raw[1]} />
        </div>
      );
    } else if (personality === 6) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <img className="partner_mask_image" src={mask_raw[3]} />
        </div>
      );
    } else if (personality === 7) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <img className="partner_mask_image" src={mask_raw[3]} />
        </div>
      );
    } else if (personality === 8) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[0]} />
          <img className="partner_mask_image" src={mask_raw[1]} />
          <img className="partner_mask_image" src={mask_raw[3]} />
        </div>
      );
    } else if (personality === 9) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <img className="partner_mask_image" src={mask_raw[3]} />
        </div>
      );
    }
  } else {
    //woman
    if (personality === 1) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <img className="partner_mask_image" src={mask_raw[8]} />
        </div>
      );
    } else if (personality === 2) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <img className="partner_mask_image" src={mask_raw[8]} />
        </div>
      );
    } else if (personality === 3) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[0]} />
          <img className="partner_mask_image" src={mask_raw[8]} />
        </div>
      );
    } else if (personality === 4) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[8]} />
        </div>
      );
    } else if (personality === 5) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
        </div>
      );
    } else if (personality === 6) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[8]} />
        </div>
      );
    } else if (personality === 7) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[8]} />
        </div>
      );
    } else if (personality === 8) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <img className="partner_mask_image" src={mask_raw[5]} />
          <img className="partner_mask_image" src={mask_raw[8]} />
        </div>
      );
    } else if (personality === 9) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <img className="partner_mask_image" src={mask_raw[3]} />
        </div>
      );
    }
  }
};
