const SoundButton = ({ label, onPress, selected }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, selected && styles.selected]}
  >
    <Text>{label}</Text>
  </TouchableOpacity>
);
