# Markdown Extension Examples

This page demonstrates using the VitePress D2 diagram plugin.

## D2 Diagrams

### Usage

````
```d2
x -> y
```
````

### Example 1

```d2
x -> y
```

### Example 2

```d2
a: The best way to avoid responsibility is to say, "I've got responsibilities"
b: Whether weary or unweary, O man, do not rest
c: I still maintain the point that designing a monolithic kernel in 1991 is a

a -> b: To err is human, to moo bovine {
  source-arrowhead: 1
  target-arrowhead: * {
    shape: diamond
  }
}

b <-> c: "Reality is just a crutch for people who can't handle science fiction" {
  source-arrowhead.label: 1
  target-arrowhead: * {
    shape: diamond
    style.filled: true
  }
}

d: A black cat crossing your path signifies that the animal is going somewhere

d -> a -> c
```

### Example 3

```d2
shape: sequence_diagram
son -> father: Can I borrow your car?
friend -> father: Never lend your car to anyone to whom you have given birth.
father -> father: internal debate ensues
```

### Example 4

```d2
cloud: {
  disks: {
    shape: sql_table
    id: int {constraint: primary_key}
  }
  blocks: {
    shape: sql_table
    id: int {constraint: primary_key}
    disk: int {constraint: foreign_key}
    blob: blob
  }
  blocks.disk -> disks.id

  AWS S3 Vancouver -> disks
}
```
