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

export default function Index({ teams }) {
  const [range, setRange] = useState([0, 9]);

  const next = () => setRange([range[0] + 10, range[1] + 10]);
  const prev = () => setRange([range[0] - 10, range[1] - 10]);

  return (
    <Stack spacing={12} px={12} pt={12} align="center">
      <Heading textAlign="center">Club Ultimate UK</Heading>
      <Accordion allowMultiple maxWidth="500px" width="100%">
        {teams.slice(...range).map(({
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
      <Flex align="center" justify="space-between" maxWidth="500px" width="100%">
        <Button rightIcon="arrow-back" variantColor="gray" variant="outline" isDisabled={range[0] === 0} onClick={prev}>
          Prev
        </Button>
        <Stack align="center" spacing={0}>
          <Text textAlign="center">
            Showing teams
            {' '}
            {range[0] + 1}
            {' '}
            to
            {' '}
            {range[1] >= teams.length ? teams.length : range[1] + 1}
          </Text>
          <Text>
            of
            {' '}
            {teams.length}
            {' '}
            teams
          </Text>
        </Stack>
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

  );
}

export async function getStaticProps() {
  // eslint-disable-next-line global-require
  const teams = require('../db/teams.json');

  return {
    props: { teams },
  };
}
