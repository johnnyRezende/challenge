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

    // Assert
    expect(response.body).toStrictEqual(expectedResult);
  });
});
