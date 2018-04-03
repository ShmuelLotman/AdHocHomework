(function() {
    document.addEventListener('DOMContentLoaded', function() {

        var form = document.getElementsByTagName('form')[0],
            addButton = document.getElementsByClassName('add')[0],
            ageField = document.getElementsByName('age')[0],
            relationshipField = document.getElementsByName('rel')[0],
            smokerField = document.getElementsByName('smoker')[0],
            householdList = document.getElementsByClassName('household')[0],
            finalOutput = document.getElementsByClassName('debug')[0];

        var household = [],
            memberUniqId = 0;
        
        addButton.addEventListener('click', function(event) {
            event.preventDefault()
            var isValid = validateForm(ageField.value, relationshipField.value)
            isValid && addHouseholdMember()
        })
        form.addEventListener('submit', submitForm)

        function resetForm() {
            document.querySelectorAll('h4[name="input_error"]').forEach(function(errorField) {
                errorField.parentNode.removeChild(errorField)
            })
            ageField.value = ''
            relationshipField.value = ''
            smokerField.checked = false
        }

        function createDeleteButton() {
            var button = document.createElement('button')
            button.innerHTML = 'Remove Member'
            button.addEventListener('click', function(event) {
                event.preventDefault()
                var listMember = button.parentNode
                removeMember(listMember)
            })
            return button
        }

        function displayNewMember(member) {
            var memberListItem = document.createElement('li'),
                deleteButton = createDeleteButton();
            
            memberListItem.setAttribute('data-id', memberUniqId)
            memberListItem.innerHTML += 'Age: ' + member['age'] + '<br />'
            memberListItem.innerHTML += 'Relationship: ' + member['relationship'] + '<br />'
            memberListItem.innerHTML += 'Smoker: ' + member['isSmoker'] + '<br />'
            
            memberListItem.appendChild(deleteButton)
            householdList.appendChild(memberListItem)

            memberUniqId++
            return memberListItem
        }

        function addHouseholdMember() {
            var memberToAdd = {
                age: ageField.value,
                relationship: relationshipField.value,
                isSmoker: smokerField.checked ? 'yes' : 'no',
                id: memberUniqId
            }
            household.push(memberToAdd)
            displayNewMember(memberToAdd)
            resetForm()
        }

        function removeMember(listMember) {
            var idToRemove = listMember.getAttribute('data-id')
            household = household.filter(function(member) {
               return member.id !== Number(idToRemove)
            })
            listMember.parentNode.removeChild(listMember)
        }

        function createError(fieldType) {
           var errorElem = document.createElement('h4')
           errorElem.setAttribute('name', 'input_error')
           errorElem.style.display = 'inline'
           errorElem.style.fontSize = '1em'
           errorElem.innerHTML = fieldType === relationshipField ? 'Relationship is a required field.' : 'Please enter a numeric age that is above 0'
           fieldType.parentNode.childNodes.length <= 3 && fieldType.parentNode.appendChild(errorElem)
        }

        function validateForm(ageVal, relationshipVal) {
            var isValid = true
            if (ageVal < 0 || !ageVal || isNaN(ageVal)) {
                createError(ageField)
                isValid = false
            } 
            if (!relationshipVal) {
                createError(relationshipField)
                isValid = false
            }
            return isValid
        }

        function submitForm(event) {
            event.preventDefault()
            if (!household.length) return false
            finalOutput.innerHTML = ''
            var householdToSubmit = JSON.stringify(household)
            finalOutput.style.display = 'table'
            finalOutput.innerHTML = householdToSubmit
        }
    })
})();
