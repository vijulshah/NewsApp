exports.getDateTime = (itemDate) => {
    let itemNewDate = new Date(itemDate);
    let monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
    let date = itemNewDate.getDate();
    let month = monthNames[itemNewDate.getMonth()];
    let year = itemNewDate.getFullYear();
    let hours = itemNewDate.getHours();
    let mid = "";
    if(hours >= 12)
    {
        mid = "pm"                    
    }
    else
    {
        mid = "am"
    }
    hours = hours % 12;
    if(hours === 0)
    {
        hours = 12;
    }
    let minutes = itemNewDate.getMinutes();
    if(minutes < 10)
    {
        minutes = '0'+minutes;
    }
    let fullDate = month+" "+date+", "+year+" at "+hours+":"+minutes+" "+mid;
    return fullDate;
}