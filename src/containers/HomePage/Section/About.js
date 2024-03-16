import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import handbook from '../../../assets/handbook/handbook.jpg';
class About extends Component {
  render() {
    return (
      <div className='section-share section-about'>
        <div className='section-about-header'>
          Truyền thông nói gì về chúng tôi
        </div>
        <div className='section-about-content'>
          <div className='content-left'>
            <iframe
              width='100%'
              height='400'
              src='https://www.youtube.com/embed/MyZ2VRh0CnQ'
              title='Chàng Trai Tự Kỷ Bị Coi Thường Nhưng Lại Là Bác Sĩ Thiên Tài || Review Phim'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          </div>
          <div className='content-right'>
            Lắng nghe và thấu hiểu nhu cầu của bệnh nhân, đồng thời cung cấp
            thông tin đầy đủ và chính xác về tình trạng sức khỏe của họ. Chăm
            sóc bệnh nhân với sự tận tâm và lòng nhân ái, luôn tôn trọng phẩm
            giá và sự riêng tư của họ. Tuân thủ các quy trình y tế một cách
            nghiêm ngặt, đảm bảo chất lượng dịch vụ tốt nhất cho bệnh nhân. Cập
            nhật kiến thức chuyên môn thường xuyên, trau dồi kỹ năng để nâng cao
            hiệu quả điều trị. Cư xử với bệnh nhân bằng thái độ lịch sự, ôn hòa,
            tạo môi trường y tế thân thiện và ấm áp.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
