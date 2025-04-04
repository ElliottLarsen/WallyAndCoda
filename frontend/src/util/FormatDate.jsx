
const FormatDate = ({ date }) => {
    const dateFormatted = (inputDate) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(inputDate).toLocaleDateString('en-US', options);
    };
    return <span>{ dateFormatted(date) }</span>;
};

export default FormatDate;