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
} from '@chakra-ui/core';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

export default function Index({ teams }) {
  const [range, setRange] = useState([0, 9]);
  const [rangeIncrement] = useState(10);
  const [ascending, setAscending] = useState(true);

  const next = () => setRange([range[0] + rangeIncrement, range[1] + rangeIncrement]);
  const prev = () => setRange([range[0] - rangeIncrement, range[1] - rangeIncrement]);

  const alphabeticalSort = (a, b) => {
    const [x, y] = ascending ? [1, -1] : [-1, 1];
    return a.name.toLowerCase() > b.name.toLowerCase() ? x : y;
  };

  return (
    <Flex justify="center" width="100%">
      <Stack spacing={12} px={[10, 10, 20, 200]} pt={12} align="center" width="100%">
        <Stack spacing={0}>
          <Heading textAlign="center">Club Ultimate UK</Heading>
          <Heading textAlign="center" size="md" fontWeight={600}>Team Directory</Heading>
        </Stack>
        <Flex width="100%">
          <Button leftIcon={ascending ? FaSortAlphaDown : FaSortAlphaUp} onClick={() => setAscending(!ascending)}>
            Sort
          </Button>
        </Flex>
        <Accordion allowMultiple width="100%">
          {teams.sort(alphabeticalSort).slice(...range).map(({
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
            {range[1] >= teams.length ? teams.length : range[1] + 1}
            {' '}
            of
            {' '}
            {teams.length}
          </Text>
          <Button rightIcon="arrow-forward" variantColor="gray" variant="outline" isDisabled={range[1] >= teams.length} onClick={next}>
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
