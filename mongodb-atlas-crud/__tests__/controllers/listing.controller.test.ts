import request from "supertest";

import app from "../../src/app";

describe("Listings routes", () => {
    test("Get all listings", async () => {

        //Act
        const res = await request(app).get("/listings");
        const name = res.body.data?.[0]?.name;
        
        //Assert
        expect(name).toEqual('Styled Apartment in the heart of HK.- Wanchai');
    });
});