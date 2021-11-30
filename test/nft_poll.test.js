let BN = web3.utils.BN;
let NFTPOLL = artifacts.require("NFTPOLL");
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: ItemStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract("NFTPOLL", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  const price = "1000";
  const excessAmount = "2000";
  const name = "book";

  let instance;

  beforeEach(async () => {
    instance = await NFTPOLL.new(4, [1, 2, 3], ["0x45546C16681391851aF21a7aa6cC13af9d02bD51", "0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", "0x704F0760E75E1C34c4a083DF9E88fB9D16a73969"], ["www.uri.com", "www.uri2.com", "www.ur3.com"]);
  });


  describe("Use cases", () => {
    it("poll must have all items initialized with 0 voter counts", async () => {
      const itemsInPoll = await instance.getAllItemsInPoll();

      assert.equal(
        itemsInPoll.length,
        3,
        "There must be 3 items in poll",
      );

      assert.equal(
        itemsInPoll[0].voteCount,
        0,
        "Vote count of item1 intialized to 0",
      );

      assert.equal(
        itemsInPoll[1].voteCount,
        0,
        "Vote count of item2 intialized to 0",
      );
      assert.equal(
        itemsInPoll[2].voteCount,
        0,
        "Vote count of item3 intialized to 0",
      );

    });


    it("Voting should increase voter counts", async () => {



      const vote1 = await instance.vote("0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", 2);


      const itemsInPoll = await instance.getAllItemsInPoll();

      assert.equal(
        itemsInPoll.length,
        3,
        "There must be 3 items in poll",
      );

      assert.equal(
        itemsInPoll[0].voteCount,
        0,
        "Vote count of item1 should be 0",
      );

      assert.equal(
        itemsInPoll[1].voteCount,
        1,
        "Vote count of item2 should be 1",
      );

      assert.equal(
        itemsInPoll[2].voteCount,
        0,
        "Vote count of item3 should be 0",
      );

    });

    it("No Duplicate Voting. Same Voter cannot vote twice", async () => {


      const vote1 = await instance.vote("0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", 2);
      await catchRevert(instance.vote("0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", 1));

      const itemsInPoll = await instance.getAllItemsInPoll();

      assert.equal(
        itemsInPoll.length,
        3,
        "There must be 2 items in poll",
      );

      assert.equal(
        itemsInPoll[0].voteCount,
        0,
        "Vote count of item1 should be 0",
      );

      assert.equal(
        itemsInPoll[1].voteCount,
        1,
        "Vote count of item2 should be 1",
      );

      assert.equal(
        itemsInPoll[2].voteCount,
        0,
        "Vote count of item3 should be 0",
      );

    });

    it("Cannot vote after poll has ended", async () => {


      const endPollResp = await instance.endPolling();
      await catchRevert(instance.vote("0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", 1));

      const itemsInPoll = await instance.getAllItemsInPoll();

      assert.equal(
        itemsInPoll.length,
        3,
        "There must be 3 items in poll",
      );

      assert.equal(
        itemsInPoll[0].voteCount,
        0,
        "Vote count of item1 should be 0",
      );

      assert.equal(
        itemsInPoll[1].voteCount,
        0,
        "Vote count of item2 should be 1",
      );
      assert.equal(
        itemsInPoll[2].voteCount,
        0,
        "Vote count of item3 should be 0",
      );

    });

    it("There must be 3 winners", async () => {

      let accounts = await web3.eth.getAccounts();

      const vote1 = await instance.vote("0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", 2, { from: accounts[0] });
      const vote2 = await instance.vote("0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", 2, { from: accounts[1] });
      const vote3 = await instance.vote("0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", 2, { from: accounts[2] });
      const vote4 = await instance.vote("0x45546C16681391851aF21a7aa6cC13af9d02bD51", 1, { from: accounts[3] });
      const vote5 = await instance.vote("0x45546C16681391851aF21a7aa6cC13af9d02bD51", 1, { from: accounts[4] });
      const vote6 = await instance.vote("0x704F0760E75E1C34c4a083DF9E88fB9D16a73969", 3, { from: accounts[5] });
      const vote7 = await instance.vote("0x55ab37E47489C99C5EF682e87578D3C9d16ED5F9", 2, { from: accounts[6] });


      const winnersResp = await instance.endPolling();
      const winners = winnersResp.logs[1].args.winners;

      assert.equal(
        winners.length,
        3,
        "There must be 3 items in poll",
      );

    });

  });
});
