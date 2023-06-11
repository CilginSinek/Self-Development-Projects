const regexDate = (date)=>{
    const regex = /^(\d{4})-(\d{2})-(\d{2}).*/;
    return date.replace(regex, '$3.$2.$1');
}
export default regexDate