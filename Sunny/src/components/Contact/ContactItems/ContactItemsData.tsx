import { IContactItems } from "../../../types/types";

// contact items text
const contactDirectlyText = (
  <>
    contact@sunny.vn
    <br />
    0386 375 697
  </>
);

const headQuaterText = <>224 Đường Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội</>;

const workWithUsText = (
  <>
    Gửi CV của bạn đến email:
    <br />
    career@sunny.vn
  </>
);

const customerServiceText = (
  <>
    hotrokhachhang@sunny.vn
    <br />
    0386 375 697
  </>
);

const mediaRelationsText = (
  <>
    truyenthong@sunny.vn
    <br />
    0386 375 697
  </>
);

const vendorSupportText = (
  <>
    hotrotacgia@sunny.vn
    <br />
    0386 375 697
  </>
);

// contact items data
export const ContactItemsData: IContactItems[] = [
  {
    id: 1,
    title: "Liên hệ trực tiếp",
    content: contactDirectlyText,
  },
  {
    id: 2,
    title: "Trụ sở chính",
    content: headQuaterText,
  },
  {
    id: 3,
    title: "Cộng tác với chúng tôi",
    content: workWithUsText,
  },
  {
    id: 4,
    title: "Dịch vụ khách hàng",
    content: customerServiceText,
  },
  {
    id: 5,
    title: "Quan hệ truyền thông",
    content: mediaRelationsText,
  },
  {
    id: 6,
    title: "Hỗ trợ đối tác",
    content: vendorSupportText,
  },
];
