import { startDB } from "../../app";
import request from 'supertest'
import { app } from "../../app";
import {type AwardInterval}  from '../../services/producers.service';


describe('Producer award interval Integration Test', () =>
{

  beforeAll(async () => {
    await startDB();
  });

  it('Should return the producer with the maximum and minimum interval between wins', async () =>
  {
    // Arrange
    const expectedResult: { max: AwardInterval[]; min: AwardInterval[] } =
    {
      max: [ {producer: "Johnny Rezende", interval: 8, previousWin: 1996, followingWin: 2004, } ],
      min: [
        { producer: "Johnny Rezende", interval: 1, previousWin: 1995, followingWin: 1996, },
        { producer: "Kevin Costner", interval: 1, previousWin: 1994, followingWin: 1995, },
      ],
    };

    // Act
    const response = await request(app).get('/producers/award-interval');

    // Asserting request body and response status
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('max');
    expect(response.body).toHaveProperty('min');

    // Asserting request body
    expectedResult.max.forEach((expectedItem, index) => {
      const actualItem = response.body.max[index];

      expect(actualItem.producer).toBe(expectedItem.producer);
      expect(actualItem.interval).toBe(expectedItem.interval);
      expect(actualItem.previousWin).toBe(expectedItem.previousWin);
      expect(actualItem.followingWin).toBe(expectedItem.followingWin);

      // Asserting types
      expect(Number.isInteger(actualItem.interval)).toBe(true);
      expect(Number.isInteger(actualItem.previousWin)).toBe(true);
      expect(Number.isInteger(actualItem.previousWin)).toBe(true);

      expect(typeof actualItem.producer).toBe('string');
    });

    expectedResult.min.forEach((expectedItem, index) =>
    {
      const actualItem = response.body.min[index];

      expect(actualItem.producer).toBe(expectedItem.producer);
      expect(actualItem.interval).toBe(expectedItem.interval);
      expect(actualItem.previousWin).toBe(expectedItem.previousWin);
      expect(actualItem.followingWin).toBe(expectedItem.followingWin);

      expect(Number.isInteger(actualItem.interval)).toBe(true);
      expect(Number.isInteger(actualItem.previousWin)).toBe(true);
      expect(Number.isInteger(actualItem.previousWin)).toBe(true);
      expect(typeof actualItem.producer).toBe('string');
    });
  });
});
