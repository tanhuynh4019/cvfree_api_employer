function formatDate_VN(date) {
    const dateFormat = new Date(date);
    const getDay = dateFormat.getDay();
    let thu;

    switch (getDay) {
        case 0:
            thu = 'Chủ nhật';
            break;
        case 1:
            thu = 'Thứ hai';
            break;
        case 2:
            thu = 'Thứ ba';
            break;
        case 3:
            thu = 'Thứ tư'
            break;
        case 4:
            thu = 'Thứ năm';
            break;
        case 5:
            thu = 'Thứ sáu';
            break;
        case 6:
            thu = 'Thứ bảy';
            break;
        default:
            thu = 'Đang cập nhật';
            break;
    };
    const textDate = `${thu} - ${dateFormat.getDate() < 10 ? '0' + dateFormat.getDate() : dateFormat.getDate()} th ${dateFormat.getMonth()+1 < 10 ? '0' + (dateFormat.getMonth()+1) : dateFormat.getMonth()+1}, ${dateFormat.getFullYear()} lúc ${dateFormat.getHours() < 10 ? '0' + dateFormat.getHours() : dateFormat.getHours()}:${dateFormat.getMinutes() < 10 ? '0' + dateFormat.getMinutes() : dateFormat.getMinutes()}`;
    return textDate;
}

module.exports = {
    formatDate_VN
}