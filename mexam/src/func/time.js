export function isTime(time){
    if(time instanceof Array){
        time = time[0]+'-'+time[1];
    }
    return time;
}