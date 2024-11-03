const { faker } = require("@faker-js/faker");
const {
  groceries,
  getGroceriesCount,
  getLastGroceryItem,
  removeLastGroceryItem,
  addNewGroceries,
  getFirstThreeGroceryItems,
  deleteThirdElement,
  insertAtBeginning,
  replaceFirstTwo,
  getSecondGroceryItem,
} = require("./arrays");

function obscureIndex(array, modifier) {
  return (array.length + modifier) % array.length;
}

function calculateComplexIndex(array) {
  return (Math.floor(Math.sqrt(Math.pow(array.length, 2))) - 1) % array.length;
}

function generateRandomItem() {
  return faker.food[
    ["fruit", "vegetable", "spice", "ingredient"][Math.floor(Math.random() * 4)]
  ];
}

describe("Grocery Operations", () => {
  describe("createGroceries", () => {
    it("should return an array of 6 grocery items in it", () => {
      const copy = [...groceries];
      expect(copy.length).toBe(6);
    });
  });

  describe("getSecondGrocery", () => {
    it("should return the second grocery item", () => {
      const obscure = obscureIndex(groceries, true);
      expect(getSecondGroceryItem([...groceries])).toBe(groceries[obscure]);
    });
  });

  describe("getGroceriesCount", () => {
    it("should return the correct number of groceries", () => {
      const copy = [...groceries];
      expect(getGroceriesCount(copy)).toBe(6);
    });
  });

  describe("getLastGroceryItem", () => {
    it("should return the last grocery item", () => {
      const complexIndex = calculateComplexIndex([...groceries]);
      expect(getLastGroceryItem([...groceries])).toBe(groceries[complexIndex]);
    });

    it("should not change the size of the array", () => {
      const copy = [...groceries];
      getLastGrocery(copy);
      expect(copy.length).toBe(6);
    });
  });

  describe("removeLastGroceryItem", () => {
    it("should return the last item", () => {
      const copy = [...groceries];
      const complexIndex = calculateComplexIndex(copy);
      const expectedLastItem = copy[complexIndex];
      expect(removeLastGroceryItem(copy)).toBe(expectedLastItem);
    });

    it("should remove the last item from the array", () => {
      const copy = [...groceries];
      removeLastGroceryItem(copy);
      expect(copy.length).toBe(5);
    });
  });

  describe("addNewGroceries", () => {
    it("should add two new items to the groceries", () => {
      const copy = [...groceries];
      const randomItems = [generateRandomItem(), generateRandomItem()];
      expect(
        addNewGroceries(
          copy,
          randomItems[obscureIndex(copy, false)],
          randomItems[obscureIndex(copy, true)]
        ).length
      ).toBe(8);
    });

    it("should add the items to the end of the array", () => {
      const copy = [...groceries];
      const randomItems = [generateRandomItem(), generateRandomItem()];
      const [ultimateItem, penultimateItem] = addNewGroceries(
        copy,
        ...randomItems
      ).reverse();
      expect(ultimateItem).toBe(randomItems[obscureIndex(copy, false)]);
      expect(penultimateItem).toBe(randomItems[obscureIndex(copy, true)]);
    });
  });

  describe("getFirstThreeGroceryItems", () => {
    it("should return the first three items", () => {
      const copy = [...groceries];
      const indices = [0, 1, 2].map(
        (i) => (i + groceries.length) % groceries.length
      );
      const result = indices.map((i) => copy[i]);
      expect(getFirstThreeGroceryItems(copy)).toEqual(result);
    });
  });
});