let tickets = [
  { pnr: "VN101", name: "Nguyen Van A", classType: "ECONOMY", weight: 0, status: "BOOKED", fee: 0 },
  { pnr: "VN102", name: "Tran Thi B", classType: "BUSINESS", weight: 0, status: "BOOKED", fee: 0 },
  { pnr: "VN103", name: "Le Van C", classType: "ECONOMY", weight: 0, status: "BOOKED", fee: 0 }
];

function findTicketByPnr(pnr) {
  return tickets.find(t => t.pnr.toUpperCase() === pnr.toUpperCase());
}

function calculateExcessBaggageFee(classType, weight) {
  let freeLimit = classType === "BUSINESS" ? 30 : 20;
  let excess = weight - freeLimit;
  return excess > 0 ? excess * 50000 : 0;
}

function listTickets() {
  console.table(tickets);
}

function checkInPassenger() {
  let pnr = prompt("Nhập mã PNR cần check-in:");
  let ticket = findTicketByPnr(pnr);
  if (!ticket) {
    console.log("Không tìm thấy mã PNR!");
    return;
  }
  if (ticket.status === "CANCELLED") {
    console.log("Vé này đã bị hủy, không thể check-in!");
    return;
  }
  if (ticket.status === "CHECKED_IN") {
    console.log("Vé này đã được check-in trước đó!");
    displayBoardingPass(ticket);
    return;
  }

  let weightStr = prompt("Nhập trọng lượng hành lý (kg):");
  let weight = parseFloat(weightStr);
  if (isNaN(weight) || weight < 0) {
    console.log("Trọng lượng không hợp lệ!");
    return;
  }

  ticket.weight = weight;
  ticket.fee = calculateExcessBaggageFee(ticket.classType, weight);
  ticket.status = "CHECKED_IN";

  console.log("Check-in thành công!");
  if (ticket.fee > 0) {
    console.log("Phí quá cước cần thu: " + ticket.fee.toLocaleString() + " VNĐ");
  } else {
    console.log("Hành lý trong định mức miễn cước.");
  }
  displayBoardingPass(ticket);
}

function displayBoardingPass(ticket) {
  console.log("========================================");
  console.log("             BOARDING PASS              ");
  console.log("========================================");
  console.log("Mã PNR: " + ticket.pnr);
  console.log("Hành khách: " + ticket.name);
  console.log("Hạng ghế: " + ticket.classType);
  console.log("Trọng lượng hành lý: " + ticket.weight + " kg");
  console.log("Phí quá cước: " + ticket.fee.toLocaleString() + " VNĐ");
  console.log("Trạng thái: " + ticket.status);
  console.log("========================================");
}

function searchTicket() {
  let keyword = prompt("Nhập mã PNR hoặc tên hành khách cần tra cứu:");
  let results = tickets.filter(t => 
    t.pnr.toUpperCase().includes(keyword.toUpperCase()) || 
    t.name.toLowerCase().includes(keyword.toLowerCase())
  );
  if (results.length > 0) {
    console.table(results);
  } else {
    console.log("Không tìm thấy kết quả phù hợp!");
  }
}

function cancelTicket() {
  let pnr = prompt("Nhập mã PNR cần hủy vé:");
  let ticket = findTicketByPnr(pnr);
  if (!ticket) {
    console.log("Không tìm thấy mã PNR!");
    return;
  }
  if (ticket.status === "CANCELLED") {
    console.log("Vé này đã ở trạng thái hủy từ trước.");
    return;
  }
  ticket.status = "CANCELLED";
  console.log("Hủy vé thành công cho mã PNR: " + ticket.pnr);
}

function main() {
  let choice;
  do {
    let input = prompt(
      "--- HỆ THỐNG QUẢN LÝ QUẦY CHECK-IN ---\n" +
      "1. Hiển thị danh sách vé\n" +
      "2. Check-in & Cân hành lý\n" +
      "3. Tra cứu vé (PNR hoặc Tên)\n" +
      "4. Hủy vé\n" +
      "5. Thoát\n" +
      "Nhập lựa chọn của bạn (1-5):"
    );
    choice = parseInt(input);
    switch (choice) {
      case 1:
        listTickets();
        break;
      case 2:
        checkInPassenger();
        break;
      case 3:
        searchTicket();
        break;
      case 4:
        cancelTicket();
        break;
      case 5:
        console.log("Thoát chương trình. Tạm biệt!");
        break;
      default:
        console.log("Lựa chọn không hợp lệ, vui lòng chọn từ 1 đến 5.");
    }
  } while (choice !== 5);
}

main();