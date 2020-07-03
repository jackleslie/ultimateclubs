import React, { useState } from 'react';
import {
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Flex,
  Box,
  Link,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Radio,
  RadioGroup,
} from '@chakra-ui/core';
import { FaSortAlphaDown, FaSortAlphaUp, FaFilter } from 'react-icons/fa';

export default function Index({ teams }) {
  const [range, setRange] = useState([0, 9]);
  const [rangeIncrement] = useState(10);
  const [ascending, setAscending] = useState(true);
  const [filter, setFilter] = useState();

  const next = () => setRange([range[0] + rangeIncrement, range[1] + rangeIncrement]);
  const prev = () => setRange([range[0] - rangeIncrement, range[1] - rangeIncrement]);

  const alphabeticalSort = (a, b) => {
    const [x, y] = ascending ? [1, -1] : [-1, 1];
    return a.name.toLowerCase() > b.name.toLowerCase() ? x : y;
  };

  const typeFilter = (({ type }) => (filter ? type === filter : true));

  const teamsFilteredLength = teams.filter(typeFilter).length;

  return (
    <Flex justify="center" width="100%">
      <Stack spacing={12} px={[10, 10, 20, 200]} pt={12} align="center" width="100%">
        <Stack spacing={0}>
          <Heading textAlign="center">Club Ultimate UK</Heading>
          <Heading textAlign="center" size="md" fontWeight={600}>Team Directory</Heading>
        </Stack>
        <Stack isInline spacing={4} justify="space-between" width="100%">
          <Button
            leftIcon={ascending ? FaSortAlphaDown : FaSortAlphaUp}
            onClick={() => setAscending(!ascending)}
          >
            Sort
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={FaFilter}>
              Filter
            </MenuButton>
            <MenuList>
              <MenuGroup title="Type">
                <RadioGroup spacing={0} onChange={(e) => setFilter(e.target.value)} value={filter} ml={4}>
                  <Radio value="School">School</Radio>
                  <Radio value="Club">Club</Radio>
                  <Radio value="University">University</Radio>
                </RadioGroup>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Stack>
        <Accordion allowMultiple width="100%">
          {teams.sort(alphabeticalSort).filter(typeFilter).slice(...range).map(({
            name, type, url, location,
          }, index) => (
            <AccordionItem key={`${name}-${index}`}>
              <AccordionHeader>
                <Flex align="center" justify="space-between" width="100%">
                  <Stack align="baseline" spacing={0}>
                    <Heading textAlign="left" size="sm">{name}</Heading>
                    <Text>{type}</Text>
                  </Stack>
                  <AccordionIcon />
                </Flex>
              </AccordionHeader>
              <AccordionPanel pb={4}>
                <Stack spacing={2}>
                  <Box>
                    <Heading size="xs">UK Ultimate team URL</Heading>
                    <Link href={url} isExternal>
                      {url}
                      {' '}
                      {url !== 'No URL available' ? <Icon name="external-link" mx="2px" /> : null}
                    </Link>
                  </Box>
                  <Box>
                    <Heading size="xs">Location</Heading>
                    <Text>{location}</Text>
                  </Box>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <Flex align="center" justify="space-between" width="100%">
          <Button rightIcon="arrow-back" variantColor="gray" variant="outline" isDisabled={range[0] === 0} onClick={prev}>
            Prev
          </Button>
          <Text textAlign="center">
            Showing
            {' '}
            {range[0] + 1}
            {' '}
            to
            {' '}
            {range[1] >= teamsFilteredLength ? teamsFilteredLength : range[1] + 1}
            {' '}
            of
            {' '}
            {teamsFilteredLength}
          </Text>
          <Button rightIcon="arrow-forward" variantColor="gray" variant="outline" isDisabled={range[1] >= teamsFilteredLength} onClick={next}>
            Next
          </Button>
        </Flex>
        <style jsx global>
          {`
          a {
            line-break: anywhere;
          }
        `}
        </style>
      </Stack>
    </Flex>
  );
}

export async function getStaticProps() {
  // eslint-disable-next-line global-require
  const teams = require('../db/teams.json');

  return {
    props: { teams },
  };
}
