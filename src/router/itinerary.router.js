const Router = require("koa-router");
const {
  addItinerary,
  getItinerary,
  getCurMontData,
  itineraryInfo,
  updateItinerary,
  deleteItinerary
} = require("../controller/itinerary.controller");
const {
  verifyAuth,
} = require("../middleware/user.middleware");

const itineraryRouter = new Router({ prefix: "/itinerarys" });
// verifyUser, 
itineraryRouter.post("/", verifyAuth, addItinerary);//添加行程
itineraryRouter.get("/raw/:timeFrom/:timeEnd", verifyAuth, getItinerary);//获取所有行程
itineraryRouter.get("/mon", verifyAuth, getCurMontData);//获取所有行程
itineraryRouter.get("/:itinerary_id", itineraryInfo);//获取某个行程
itineraryRouter.post("/update", verifyAuth, updateItinerary);//修改某个行程
itineraryRouter.post("/del/:itinerary_id", verifyAuth, deleteItinerary);//修改某个行程
module.exports = itineraryRouter;