import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useState, useEffect, useDeferredValue, useMemo } from "react";
import Student from "./Student";

const Classroom = () => {
  const [students, setstudents] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchMajor, setSearchMajor] = useState("");
  const [searchInterest, setSearchInterest] = useState("");

  useEffect(() => {
    fetch("https://cs571.org/rest/s25/hw4/students", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setstudents(data);
        console.log("Received students:", students);
      });
  }, []);

  const handleReset = () => {
    setSearchName("");
    setSearchMajor("");
    setSearchInterest("");
  };

  const searchCriteria = useMemo(() => {
    return { name: searchName, major: searchMajor, interest: searchInterest };
  }, [searchName, searchMajor, searchInterest]);

  const deferredSearch = useDeferredValue(searchCriteria);

  const isStale = searchCriteria !== deferredSearch;

  const filteredStudents = students.filter((s) => {
    const sName = deferredSearch.name.toLowerCase().trim();
    const sMajor = deferredSearch.major.toLowerCase().trim();
    const sInterest = deferredSearch.interest.toLowerCase().trim();

    const matchesName =
      s.name.first.toLowerCase().includes(sName) ||
      s.name.last.toLowerCase().includes(sName);
    const matchesMajor = s.major.toLowerCase().includes(sMajor);
    const matchesInterest = s.interests.some((i) =>
      i.toLowerCase().includes(sInterest),
    );

    return matchesName && matchesMajor && matchesInterest;
  });

  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.ceil(filteredStudents.length / 24) || 1;

  let pageButtons = [];
  for (let number = 1; number <= totalPages; ++number) {
    pageButtons.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    setActivePage(1);
  }, [deferredSearch]);

  return (
    <div>
      <h1>Badger Book</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control
          id="searchName"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={searchMajor}
          onChange={(e) => setSearchMajor(e.target.value)}
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={searchInterest}
          onChange={(e) => setSearchInterest(e.target.value)}
        />
        <br />
        <Button variant="neutral" onClick={handleReset}>
          Reset Search
        </Button>
      </Form>
      <p>
        There are {filteredStudents.length} student(s) matching your search.
      </p>
      <Container
        fluid
        style={{
          opacity: isStale ? 0.2 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <Pagination>
          <Pagination.Prev
            onClick={() => setActivePage(activePage - 1)}
            disabled={activePage === 1}
          />
          {pageButtons}
          <Pagination.Next
            onClick={() => setActivePage(activePage + 1)}
            disabled={activePage === totalPages}
          />
        </Pagination>
        <Row>
          {filteredStudents.length > 0 ? (
            filteredStudents
              .slice((activePage - 1) * 24, activePage * 24)
              .map((r) => (
                <Col xs={12} sm={12} md={6} lg={4} xl={3} key={r.id}>
                  <Student {...r} />
                </Col>
              ))
          ) : (
            <p>None</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Classroom;
