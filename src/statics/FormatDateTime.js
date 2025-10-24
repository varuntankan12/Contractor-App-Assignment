export const formatDateTime = (isoString) => {
    if (!isoString) return '--/--';
    const date = new Date(isoString);
    const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = date.toLocaleDateString('en-AU', dateOptions).replace(/,/, '');
    const formattedTime = date.toLocaleTimeString('en-AU', timeOptions);
    return `${formattedDate} ${formattedTime}`;
};