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
  RadioGroup,
  CloseButton,
  Badge,
  Checkbox,
  CheckboxGroup,
  List,
  ListItem,
} from '@chakra-ui/core';
import { FaSortAlphaDown, FaSortAlphaDownAlt, FaFilter } from 'react-icons/fa';
import Head from 'next/head';

export default function Index({ clubs }) {
  const [rangeIncrement] = useState(20);
  const [range, setRange] = useState([0, rangeIncrement - 1]);
  const [ascending, setAscending] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState([]);
  const [search, setSearch] = useState('');

  const handleTypeFilterChange = (e) => setTypeFilter(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const next = () => setRange([range[0] + rangeIncrement, range[1] + rangeIncrement]);
  const prev = () => setRange([range[0] - rangeIncrement, range[1] - rangeIncrement]);

  const alphabeticalSort = (a, b) => {
    const [x, y] = ascending ? [1, -1] : [-1, 1];
    return a.name.toLowerCase() > b.name.toLowerCase() ? x : y;
  };

  const typeFilterFunc = (({ type }) => (typeFilter ? type === typeFilter : true));
  const divisionFilterFunc = (({ divisions }) => (divisionFilter.length > 0 ? (divisions.filter((division) => divisionFilter.includes(division)).length > 0) : true));
  const searchFunc = (({ name, location }) => (
    name.toLowerCase().indexOf(search.toLowerCase()) >= 0 || location.toLowerCase().indexOf(search.toLowerCase()) >= 0)
  );

  const clubsFilteredLength = clubs.filter(typeFilterFunc).filter(divisionFilterFunc).filter(searchFunc).length;

  const showMessage = () => (clubsFilteredLength > 0 ? (
    `${range[0] + 1}-${range[1] >= clubsFilteredLength ? clubsFilteredLength : range[1] + 1} of ${clubsFilteredLength}`
  ) : (
    'No clubs'
  ));

  return (
    <Flex justify="center" width="100%">
      <Head>
        <title>UK Ultimate Club Directory</title>
      </Head>
      <Stack spacing={12} px={[4, 10, 20, 200]} pt={12} align="center" width="100%">
        <Heading textAlign="center">UK Ultimate Club Directory</Heading>
        <Stack isInline spacing={[2, 3, 4]} width="100%">
          <Button
            onClick={() => setAscending(!ascending)}
            width="10%"
            p={0}
          >
            <Box as={ascending ? FaSortAlphaDown : FaSortAlphaDownAlt} />
          </Button>
          <InputGroup width="100%">
            <Input aria-label="Search input" placeholder="Search by club name or location" value={search} onChange={handleSearchChange} />
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
                <RadioGroup
                  spacing={0}
                  ml={4}
                  onChange={handleTypeFilterChange}
                  value={typeFilter}
                >
                  <Radio value="">
                    Any
                  </Radio>
                  <Radio value="School">
                    School
                  </Radio>
                  <Radio value="Club">
                    Club
                  </Radio>
                  <Radio value="University">
                    University
                  </Radio>
                </RadioGroup>
              </MenuGroup>
              <MenuGroup title="Divisions">
                <CheckboxGroup
                  ml={4}
                  spacing={0}
                  value={divisionFilter}
                  onChange={setDivisionFilter}
                >
                  <Checkbox value="school">
                    School
                  </Checkbox>
                  <Checkbox value="uni">
                    Uni
                  </Checkbox>
                  <Checkbox value="open">
                    Open
                  </Checkbox>
                  <Checkbox value="women's">
                    Women
                  </Checkbox>
                  <Checkbox value="mixed">
                    Mixed
                  </Checkbox>
                  <Checkbox value="masters">
                    Masters
                  </Checkbox>
                </CheckboxGroup>
              </MenuGroup>
              <Button
                size="md"
                ml={4}
                mt={3}
                mb={2}
                variant="link"
                fontWeight={400}
                onClick={() => {
                  setTypeFilter('');
                  setDivisionFilter([]);
                }}
              >
                Clear
              </Button>
            </MenuList>
          </Menu>
        </Stack>
        <Accordion allowMultiple width="100%">
          {clubs.sort(alphabeticalSort).filter(typeFilterFunc).filter(divisionFilterFunc).filter(searchFunc)
            .slice(...range)
            .map(({
              name, type, url, location, divisions,
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
                  <Stack spacing={3}>
                    <Box>
                      <Heading size="xs">URLs</Heading>
                      <List styleType="disc">
                        <ListItem>
                          <Link href={url} isExternal>
                            UK Ultimate
                            {' '}
                            {url !== 'No URL available' ? <Icon name="external-link" mx="2px" /> : null}
                          </Link>
                        </ListItem>
                      </List>
                    </Box>
                    <Box>
                      <Heading size="xs">Divisions</Heading>
                      {divisions.length > 0 ? (
                        <Stack isInline mt={1}>
                          {divisions.map((division) => (
                            <Badge>{division}</Badge>
                          ))}
                        </Stack>
                      ) : 'No divisions available'}
                    </Box>
                    <Box>
                      <Heading size="xs">Location</Heading>
                      <Box dangerouslySetInnerHTML={{ __html: `<address>${location}</address>` }} />
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
          <Button rightIcon="arrow-forward" variantColor="gray" variant="outline" isDisabled={range[1] >= clubsFilteredLength - 1} onClick={next}>
            Next
          </Button>
        </Stack>
        <style jsx global>
          {`
          a {
            line-break: anywhere;
          }

          abbr {
            text-decoration: none !important;
          }
        `}
        </style>
      </Stack>
    </Flex>
  );
}

export async function getStaticProps() {
  // eslint-disable-next-line global-require
  const clubs = require('../db/clubs.json');

  return {
    props: { clubs },
  };
}
