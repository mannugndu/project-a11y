# context 

{
include: [['#header'], ['a'], ['#frame1', '#frame2', '#fix']]
}
or
'.locator'

# options

runOnly: {
type: 'rule',
values: ['ruleId1', 'ruleId2', 'ruleId3']
}
or
runOnly: ['ruleId1', 'ruleId2', 'ruleId3'];
or
runOnly: 'ruleId1'

{
runOnly: ['wcag2a', 'wcag2aa']
},
or
runOnly: {
type: 'tag',
values: ['wcag2a', 'wcag2aa']
}

rules: {
'color-contrast': { enabled: false },
'valid-lang': { enabled: false }
}

runOnly: {
type: 'tag',
values: ['wcag2a']
},
rules: {
'color-contrast': { enabled: true },
'valid-lang': { enabled: false }
}
