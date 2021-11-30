let BN = web3.utils.BN;
let NFTPOLLFactory = artifacts.require("NFTPOLLFactory");
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: ItemStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract("NFTPOLLFactory", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  const price = "1000";
  const excessAmount = "2000";
  const name = "book";

  let instance;

  beforeEach(async () => {
    instance = await NFTPOLLFactory.new();
  });


  describe("Use cases", () => {
    it("create poll must create a new contract for a poll", async () => {
      const poll1 = await instance.createNewPoll(4, [1], ["0x45546C16681391851aF21a7aa6cC13af9d02bD51"], ["www.uri.com"]);
      const poll2 = await instance.createNewPoll(5, [1], ["0x45546C16681391851aF21a7aa6cC13af9d02bD51"], ["www.uri.com"]);
      const allPolls = await instance.getAllOngoingPolls();
      assert.equal(
        allPolls.length,
        2,
        "There must be 2 on going polls",
      );



    });

  });
});
