export function smoothHorizontalScrolling(e, time, amount, start) {
    var eAmt = amount / 100;
    var curTime = 0;
    var scrollCounter = 0;
    const Y = window.scrollY;
    while (curTime <= time) {
        window.setTimeout(SHS_B, curTime, e, scrollCounter, eAmt, start, Y);
        curTime += time / 100;
        scrollCounter++;
    }
    window.scroll(0, Y);
}
function SHS_B(e, sc, eAmt, start) {
    e.scrollLeft = eAmt + sc + start;
}