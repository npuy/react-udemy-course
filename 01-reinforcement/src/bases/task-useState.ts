function useState(name: string) {
  return [name, (name: string) => console.log(name)] as const;
}

const [name, setName] = useState("Goku");
console.log(name);
setName("Vegeta");
