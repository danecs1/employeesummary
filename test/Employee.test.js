const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
    const e = new Employee();
    expect(typeof (e)).toBe("object");
});

test("Can set name via constructor arguments", () => {
    const name = "Alice";
    const e = new Employee(1, name, "email@gmail.com");
    expect(e.name).toBe(name);
});

test("Can set id via constructor argument", () => {
    const testValue = 100;
    const e = new Employee(testValue, "Foo", "foo@gmail.com");
    expect(e.id).toBe(testValue);
});

test("Can set email via constructor argument", () => {
    const testValue = "test@test.com";
    const e = new Employee("Foo", 1, testValue);
    expect(e.email).toBe(testValue);
});

test("Can get name via getName()", () => {
    const testValue = "Alice";
    const e = new Employee(30, testValue, "alice@gmail.com");
    expect(e.getName()).toBe(testValue);
});

test("Can get id via getId()", () => {
    const testValue = 100;
    const e = new Employee(testValue, "Don Felix", "donfelix@gmail.com");
    expect(e.getId()).toBe(testValue);
});

test("Can get email via getEmail()", () => {
    const testValue = "test@test.com";
    const e = new Employee("Foo", 1, testValue);
    expect(e.getEmail()).toBe(testValue);
});

test("getRole() should return \"Employee\"", () => {
    const testValue = "Employee";
    const e = new Employee("Alice", 1, "test@test.com");
    expect(e.getRole()).toBe(testValue);
});
