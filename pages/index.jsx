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
  Input,
  InputRightElement,
  InputGroup,
  MenuGroup,
  Radio,
  CloseButton,
} from '@chakra-ui/core';
import { FaSortAlphaDown, FaSortAlphaUp, FaFilter } from 'react-icons/fa';

export default function Index({ teams }) {
  const [rangeIncrement] = useState(20);
  const [range, setRange] = useState([0, rangeIncrement - 1]);
  const [ascending, setAscending] = useState(true);
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState('');

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const next = () => setRange([range[0] + rangeIncrement, range[1] + rangeIncrement]);
  const prev = () => setRange([range[0] - rangeIncrement, range[1] - rangeIncrement]);

  const alphabeticalSort = (a, b) => {
    const [x, y] = ascending ? [1, -1] : [-1, 1];
    return a.name.toLowerCase() > b.name.toLowerCase() ? x : y;
  };

  const typeFilter = (({ type }) => (filter ? type === filter : true));
  const searchFilter = (({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) >= 0);

  const teamsFilteredLength = teams.filter(typeFilter).filter(searchFilter).length;

  const showMessage = () => (teamsFilteredLength > 0 ? (
    `${range[0] + 1}-${range[1] >= teamsFilteredLength ? teamsFilteredLength : range[1] + 1} of ${teamsFilteredLength}`
  ) : (
    'No teams'
  ));

  return (
    <Flex justify="center" width="100%">
      <Stack spacing={12} px={[4, 10, 20, 200]} pt={12} align="center" width="100%">
        <Stack spacing={0}>
          <Heading textAlign="center">Club Ultimate UK</Heading>
          <Heading textAlign="center" size="md" fontWeight={600}>Team Directory</Heading>
        </Stack>
        <Stack isInline spacing={[2, 3, 4]} width="100%">
          <Button
            onClick={() => setAscending(!ascending)}
            width="10%"
            p={0}
          >
            <Box as={ascending ? FaSortAlphaDown : FaSortAlphaUp} />
          </Button>
          <InputGroup width="100%">
            <Input aria-label="Team name input" placeholder="Team name" value={search} onChange={handleSearchChange} />
            {search.length > 0 ? (
              <InputRightElement>
                <CloseButton onClick={() => setSearch('')} />
              </InputRightElement>
            ) : null}
          </InputGroup>
          <Menu>
            <MenuButton as={Button} width="10%" p={0}>
              <Box as={FaFilter} />
            </MenuButton>
            <MenuList>
              <MenuGroup title="Type">
                <Stack
                  spacing={0}
                  ml={4}
                >
                  <Radio
                    value="School"
                    isChecked={filter === 'School'}
                    onChange={handleFilterChange}
                  >
                    School
                  </Radio>
                  <Radio
                    value="Club"
                    isChecked={filter === 'Club'}
                    onChange={handleFilterChange}
                  >
                    Club
                  </Radio>
                  <Radio
                    value="University"
                    isChecked={filter === 'University'}
                    onChange={handleFilterChange}
                  >
                    University
                  </Radio>
                </Stack>
                <Button size="md" ml={4} mt={3} mb={2} variant="link" fontWeight={400} onClick={() => setFilter()}>
                  Clear
                </Button>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Stack>
        <Accordion allowMultiple width="100%">
          {teams.sort(alphabeticalSort).filter(typeFilter).filter(searchFilter).slice(...range)
            .map(({
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
        <Stack isInline width="100%" justify="space-between" align="center" spacing={5}>
          <Button rightIcon="arrow-back" variantColor="gray" variant="outline" isDisabled={range[0] === 0} onClick={prev}>
            Prev
          </Button>
          <Text textAlign="center" fontSize={['sm', 'md']}>
            {showMessage()}
          </Text>
          <Button rightIcon="arrow-forward" variantColor="gray" variant="outline" isDisabled={range[1] >= teamsFilteredLength} onClick={next}>
            Next
          </Button>
        </Stack>
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
