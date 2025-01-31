import { Box, Grid, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { inputTypes } from "../forms/inputRender";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierHeathLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CreateInputModal from "./CreateInputModal";

const GridSelector = () => {
  const [totalCells, setTotalCells] = useState(60);
  const [columns, setColumns] = useState(12);
  const [gap, setGap] = useState(1);
  const [gridCells, setGridCells] = useState<React.ReactNode[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<{[key: string]: string | boolean | string[]}[]>([]);

  interface OccupiedCell {
    gridColumnSpan: number;
    component: React.ReactNode;
  }

  const [occupiedCells, setOccupiedCells] = useState<OccupiedCell[]>([]);

  console.log(occupiedCells)

  useEffect(() => {
    const calculateGridCells = () => {
      const cells: React.ReactNode[] = [];
      let remainingCells = totalCells;
      let occupiedIndex = 0;
      let freeIndex = 1;
      while (remainingCells > 0) {
        // Check if we have an occupied cell to place
        if (occupiedIndex < occupiedCells.length) {
          const currentOccupied = occupiedCells[occupiedIndex];

          // Skip to next row if current occupied cell won't fit
          if (
            (cells.length % columns) + currentOccupied.gridColumnSpan >
            columns
          ) {
            // Fill remaining cells in current row with empty boxes
            while (cells.length % columns !== 0) {
              cells.push(
                <Box
                  key={`empty-${cells.length}`}
                  borderWidth={1}
                  borderRadius={8}
                  aspectRatio={1}
                />
              );
            }
          }

          // Place occupied cell
          cells.push(
            <Box
              key={`occupied-${cells.length}`}
              gridColumn={`span ${currentOccupied.gridColumnSpan}`}
              borderWidth={0}
              borderRadius={8}
              overflow="hidden"
              // onClick={() => alert(cells.length)}
            >
              {currentOccupied.component}
            </Box>
          );

          remainingCells -= currentOccupied.gridColumnSpan;
          occupiedIndex++;
        } else {
          // Fill with empty cells
          cells.push(
            <Box
              key={`empty-${cells.length}`}
              borderColor={"gray.500"}
              borderWidth={1}
              borderRadius={8}
              aspectRatio={1}
              //   utuilia o selectedTiles pra pintar x quantidade de quadrados de vermelho ex se selectedTiles = 5, pinta os primeiros 5 box gerados
              bg={freeIndex <= selectedTiles ? "gray.300" : "transparent"}
              gridColumn={`span 1`}
              cursor={"pointer"}
              transition={"all 0.3s"}
              onClick={() => setSelectedTiles((p) => p + 1)}
              onContextMenu={(e) => {
                e.preventDefault();
                setSelectedTiles((p) => p - 1);
              }}
              _hover={{
                // bg: "gray.800",
                scale: 1.05,
              }}
            />
          );
          remainingCells--;
          freeIndex++;
        }
      }

      return cells;
    };

    setGridCells(calculateGridCells());
  }, [totalCells, columns, selectedTiles, occupiedCells]);

  const addOccupiedCell = (
    element: keyof typeof inputTypes,
    gridColumnSpan: number,
    label: string,
    placeholder: string
  ) => {
    setOccupiedCells([
      ...occupiedCells,
      {
        gridColumnSpan: gridColumnSpan,
        component: inputTypes[element]({
          label: label,
          placeholder: placeholder,
          isRequired: false,
        }),
      },
    ]);
    setSelectedTiles(0);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setOpen(true);
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const stringifyObject = (obj: {[key: string]: string | boolean | string[]}[]): string => {
    // transform code into string but without the "" from json
    return JSON.stringify(obj, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/"/g, "'");
  };

  console.log(selectedTiles)

  return (
    <>
    <CreateInputModal isOpen={open} onClose={() => setOpen(false)} colSpan={selectedTiles} setCode={setCode} addOccupiedCell={addOccupiedCell}  />
      <Stack gap={8} bg={"gray.50"} p={8} borderRadius={8}>
        <Text fontWeight={"bold"} fontSize={"3xl"}>🛠️ Form Object Generator</Text>
        <HStack gap={4}>
          <Stack>
            <Text>Columns</Text>
            <Input
              borderColor={"gray.500"}
              variant="outline"
              id="columns"
              type="number"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              min={1}
            />
          </Stack>
          <Stack>
            <Text>Total Cells</Text>
            <Input
              borderColor={"gray.500"}
              id="totalCells"
              type="number"
              value={totalCells}
              variant="outline"
              onChange={(e) => setTotalCells(Number(e.target.value))}
              min={1}
            />
          </Stack>
          <Stack>
            <Text>Gap</Text>
            <Input
              borderColor={"gray.500"}
              id="gap"
              type="number"
              value={gap}
              variant="outline"
              onChange={(e) => setGap(Number(e.target.value))}
              min={1}
            />
          </Stack>
        </HStack>
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={gap}>
          {gridCells}
        </Grid>
        <Box textAlign={"left"} border={"2px"} borderRadius={8} p={4} borderColor={"gray.500"}>
          {/* <ClipboardRoot value={stringifyObject(code)}>
            <ClipboardIconButton />
        </ClipboardRoot> */}
          <SyntaxHighlighter language="javascript" style={atelierHeathLight}>
            {stringifyObject(code)}
          </SyntaxHighlighter>
        </Box>
      </Stack>
    </>
  );
};

export default GridSelector;
