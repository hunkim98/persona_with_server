import { mask_raw } from "../masks/mask_raw";
import { show_mask_name } from "./mask_info";

export const best_with_gender = (personality, number) => {
  if (number === 0) {
    //man
    if (personality === 1) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>
        </div>
      );
    } else if (personality === 2) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>
        </div>
      );
    } else if (personality === 3) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[0]} />
          <div className="partner_mask_name">{show_mask_name(1)}</div>
          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>
        </div>
      );
    } else if (personality === 4) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>
          <img className="partner_mask_image" src={mask_raw[5]} />
          <div className="partner_mask_name">{show_mask_name(6)}</div>
        </div>
      );
    } else if (personality === 5) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <div className="partner_mask_name">{show_mask_name(5)}</div>
          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>
        </div>
      );
    } else if (personality === 6) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>
          <img className="partner_mask_image" src={mask_raw[3]} />
          <div className="partner_mask_name">{show_mask_name(4)}</div>
        </div>
      );
    } else if (personality === 7) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>

          <img className="partner_mask_image" src={mask_raw[3]} />
          <div className="partner_mask_name">{show_mask_name(4)}</div>
        </div>
      );
    } else if (personality === 8) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[0]} />
          <div className="partner_mask_name">{show_mask_name(1)}</div>

          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>

          <img className="partner_mask_image" src={mask_raw[3]} />
          <div className="partner_mask_name">{show_mask_name(4)}</div>
        </div>
      );
    } else if (personality === 9) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[1]} />
          <div className="partner_mask_name">{show_mask_name(2)}</div>

          <img className="partner_mask_image" src={mask_raw[3]} />
          <div className="partner_mask_name">{show_mask_name(4)}</div>
        </div>
      );
    }
  } else {
    //woman
    if (personality === 1) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <div className="partner_mask_name">{show_mask_name(5)}</div>

          <img className="partner_mask_image" src={mask_raw[8]} />
          <div className="partner_mask_name">{show_mask_name(9)}</div>
        </div>
      );
    } else if (personality === 2) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <div className="partner_mask_name">{show_mask_name(5)}</div>

          <img className="partner_mask_image" src={mask_raw[8]} />
          <div className="partner_mask_name">{show_mask_name(9)}</div>
        </div>
      );
    } else if (personality === 3) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[0]} />
          <div className="partner_mask_name">{show_mask_name(1)}</div>

          <img className="partner_mask_image" src={mask_raw[8]} />
          <div className="partner_mask_name">{show_mask_name(9)}</div>
        </div>
      );
    } else if (personality === 4) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[8]} />
          <div className="partner_mask_name">{show_mask_name(9)}</div>
        </div>
      );
    } else if (personality === 5) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <div className="partner_mask_name">{show_mask_name(5)}</div>
        </div>
      );
    } else if (personality === 6) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[8]} />
          <div className="partner_mask_name">{show_mask_name(9)}</div>
        </div>
      );
    } else if (personality === 7) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[8]} />
          <div className="partner_mask_name">{show_mask_name(9)}</div>
        </div>
      );
    } else if (personality === 8) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[4]} />
          <div className="partner_mask_name">{show_mask_name(5)}</div>

          <img className="partner_mask_image" src={mask_raw[5]} />
          <div className="partner_mask_name">{show_mask_name(6)}</div>

          <img className="partner_mask_image" src={mask_raw[8]} />
          <div className="partner_mask_name">{show_mask_name(9)}</div>
        </div>
      );
    } else if (personality === 9) {
      return (
        <div className="partner_mask_container">
          <img className="partner_mask_image" src={mask_raw[2]} />
          <div className="partner_mask_name">{show_mask_name(3)}</div>
          <img className="partner_mask_image" src={mask_raw[5]} />
          <div className="partner_mask_name">{show_mask_name(6)}</div>
          <img className="partner_mask_image" src={mask_raw[6]} />
          <div className="partner_mask_name">{show_mask_name(7)}</div>
          <img className="partner_mask_image" src={mask_raw[8]} />
          <div className="partner_mask_name">{show_mask_name(9)}</div>
        </div>
      );
    }
  }
};
