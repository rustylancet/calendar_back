const itineraryService = require("../service/itinerary.service");
const { log } = require("console");
const util = require("../constants/util")

class ItineraryController {
  //添加行程
  async addItinerary(ctx, next) {
    const { user_id } = ctx.user;
    const itinerary = ctx.request.body;
    // console.log(user_id);
    const result = await itineraryService.createItinerary(itinerary, user_id);
    // console.log(result);
    ctx.body = util.success(result);
  }
  //获取当月行程
  async getItinerary(ctx, next) {
    const { user_id } = ctx.user;
    // console.log('///');
    const { timeFrom, timeEnd } = ctx.params;
    // console.log(timeFrom, timeEnd);
    const result = await itineraryService.getItinerary(timeFrom, timeEnd, user_id);

    ctx.body = util.success(util.format(result));
  }
  //获取当月展示数据
  async getCurMontData(ctx, next) {
    const { user_id } = ctx.user;
    // const date = new Date();
    var daycount = util.getDays();
    // console.log(daycount);
    var timeFrom = util.getFirstDayOfMonth();
    var timeEnd = util.getEndDayOfMonth();

    // console.log(timeFrom, timeEnd);
    const result = util.format(await itineraryService.getItinerary(timeFrom, timeEnd, user_id));
    // console.log(result);

    var data = [];

    //test
    util.betweenDates()
    for (var i = 0; i < daycount; i++) {
      var tmp = new Date();
      // console.log(tmp);
      // var birthday = new Date('1995-12-17T03:24:00Z');
      tmp.setDate(i + 1)
      // tmp.setHours(0, 0, 0)
      // console.log(tmp);
      // console.log(util.formTimeWithoutTime(tmp));
      // console.log(typeof tmp.toLocaleDateString());
      data[i] = {
        date: tmp,
        itinerarys: []
      }
      var a = tmp.getDate();
      for (var j = 0; j < result.length; j++) {
        var item = result[j];
        // var tmpS = new Date(item.start);
        // var tmpE = new Date(item.end);

        var tmpS = new Date(item.start).getDate();
        var tmpE = new Date(item.end).getDate();

        // if (util.betweenDates(tmp, tmpS, tmpE)) {
        //   data[i].itinerarys.push(item)
        // }
        if (a == tmpE || a == tmpS || (a >= tmpS && a <= tmpE)) {
          data[i].itinerarys.push(item)
        }
      }
      // data[i].date = data[i].date.toLocaleString()
      // console.log(data[i].date, data[i].date.toLocaleString());
      // "date": "2021-11-01T08:09:55.700Z",
      // "date": "2021-11-01T08:10:22.018Z",
    }
    ctx.body = util.success(data);
  }
  //获取某个行程信息
  async itineraryInfo(ctx, next) {
    const { itinerary_id } = ctx.params;
    const result = await itineraryService.getItineraryInfoById(itinerary_id);
    ctx.body = util.success(result);
  }

  async updateItinerary(ctx, next) {
    const itinerary = ctx.request.body;
    // console.log(itinerary);
    const result = await itineraryService.updateItinerary(itinerary);
    ctx.body = util.success();
  }

  async deleteItinerary(ctx, next) {
    const { itinerary_id } = ctx.params;
    const result = await itineraryService.deleteItinerary(itinerary_id);
    ctx.body = util.success(result);
  }
}

module.exports = new ItineraryController();
