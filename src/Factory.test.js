import { Factory } from "./Factory";
it("should increment the total when make is called", () =>{
    const sut = new Factory(()=>{});
    sut.Make();
    sut.Update();
    expect(sut.total).toBe(1);
})



