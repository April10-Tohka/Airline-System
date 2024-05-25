import { defineStore } from 'pinia'
import {ref} from "vue";

export const useEventBusStore=defineStore("eventBus",()=>{
    let eventQueue=ref([]);//事件队列


    /**
     * 触发事件
     * @param event 事件名
     * @param value 传递的值
     */
    function emitEvent(event,value)
    {
        console.log("调用了emitEvent");
        console.log(event);
        console.log(value);
        eventQueue.value.push({event,value});
    }


    /**
     * 获取事件
     * @param event 事件名
     * @returns {Promise<unknown>}
     */
    function getEvent(event)
    {
        console.log("调用了getEvent");
        console.log("查看事件队列",eventQueue);
        return new Promise((resolve, reject)=>{
            const events= eventQueue.value.filter(item=>item.event===event);
            console.log(events);
            if (events.length>0)
            {
                resolve(events);
            }
            else
            {
                reject(new Error(`没有找到事件${event}`));
            }
        })
    }


    /**
     * 移除事件
     * @param event 事件名
     */
    function removeEvent(event)
    {
        console.log("调用了removeEvent");
        eventQueue.value= eventQueue.value.filter(item=>item.event!==event);
    }

    return {eventQueue,emitEvent,getEvent,removeEvent}
})
